# --- Base Bun image for deps & runtime ---
FROM oven/bun:1 AS base
WORKDIR /home/app

# --- Install dependencies ---
FROM base AS install
COPY package.json ./
RUN bun install --no-lockfile
# optionally cache node_modules separately for prod/dev if you want

# --- Build stage using Node 20 (needed for Next.js build) ---
FROM node:20-alpine AS builder
WORKDIR /home/app

# Copy node_modules installed by Bun
COPY --from=install /home/app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ARG NODE_ENV
ENV NODE_ENV="${NODE_ENV}"

# Build the Next.js app
RUN npm run build  # Node ≥20 required for Next.js

# --- Final Bun runtime stage ---
FROM oven/bun:1 AS runner
WORKDIR /home/app
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV NODE_ENV=PRODUCTION

# Copy production deps from Bun install
COPY --from=install /home/app/node_modules ./node_modules

# Copy built Next.js standalone app
COPY --from=builder /home/app/.next/standalone ./standalone
COPY --from=builder /home/app/public ./standalone/public
COPY --from=builder /home/app/.next/static ./standalone/.next/static
COPY --from=builder /home/app/package.json .

EXPOSE 3000

# Run server using Bun
CMD ["bun", "run", "./standalone/server.js"]
