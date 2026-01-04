# --- Base stage with Bun ---
FROM oven/bun:1 AS base
WORKDIR /home/app

# --- Install all dependencies (including devDependencies needed for build) ---
FROM base AS deps
COPY package.json ./
RUN bun install --no-lockfile

# --- Build stage using Node 20 (required for Next.js build) ---
FROM node:20-alpine AS builder
WORKDIR /home/app

# Copy node_modules installed by Bun (includes dev deps for build)
COPY --from=deps /home/app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Set NODE_ENV (passed via build arg or default to production)
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Build the Next.js app → creates .next/standalone with minimal runtime deps
RUN npm run build

# --- Final runtime stage using Bun ---
FROM oven/bun:1 AS runner
WORKDIR /home/app

# Environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Expose port
EXPOSE 3000

# Copy only the standalone output (includes traced minimal node_modules)
COPY --from=builder /home/app/.next/standalone ./

# Copy static files (not included in standalone by default)
COPY --from=builder /home/app/.next/static ./.next/static

# Copy public assets
COPY --from=builder /home/app/public ./public

# Optional: Copy package.json if needed (e.g. for scripts or metadata)
# COPY --from=builder /home/app/package.json ./

# Optional: Copy next.config.js if you use runtime config
# COPY --from=builder /home/app/next.config.js ./

# Run the standalone server with Bun
CMD ["bun", "server.js"]