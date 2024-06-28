FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /wanchcoach/src/app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
RUN npm ci --production
RUN rm -rf ./.next/cache

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /wanchcoach/src/app
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /wanchcoach/src/app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /wanchcoach/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /wanchcoach/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /wanchcoach/src/app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]