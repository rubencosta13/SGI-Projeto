# --- Dependencies stage ---
FROM oven/bun:1.0.0 AS dependencies
WORKDIR /home/app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --production=false

# --- Builder stage ---
FROM oven/bun:1.0.0 AS builder
WORKDIR /home/app

# Copy node_modules from dependencies stage
COPY --from=dependencies /home/app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ARG NODE_ENV
ENV NODE_ENV="${NODE_ENV}"

# Build the Next.js app
RUN bun run build

# Install only production deps for the runner
RUN bun install --production --ignore-scripts

# --- Runner stage ---
FROM gcr.io/distroless/nodejs22-debian12 AS runner
WORKDIR /home/app

ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Copy built Next.js app
COPY --from=builder /home/app/.next/standalone ./standalone
COPY --from=builder /home/app/public ./standalone/public
COPY --from=builder /home/app/.next/static ./standalone/.next/static

EXPOSE 3000

CMD ["./standalone/server.js"]
