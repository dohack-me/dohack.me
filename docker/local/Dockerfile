FROM node:18-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY prisma/schema.prisma ./prisma/schema.prisma
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi


# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
ENV NODE_ENV=development

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN --mount=type=secret,id=NEXT_PUBLIC_BACKEND_HOST,env=NEXT_PUBLIC_BACKEND_HOST,required=true \
    --mount=type=secret,id=BACKEND_URL,env=BACKEND_URL,required=true \
    --mount=type=secret,id=BACKEND_SECRET_KEY,env=BACKEND_SECRET_KEY,required=true \
    --mount=type=secret,id=DATABASE_URL,env=DATABASE_URL,required=true \
    --mount=type=secret,id=DIRECT_URL,env=DIRECT_URL,required=true \
    --mount=type=secret,id=AUTH_TRUST_HOST,env=AUTH_TRUST_HOST,required=true \
    --mount=type=secret,id=AUTH_URL,env=AUTH_URL,required=true \
    --mount=type=secret,id=AUTH_SECRET,env=AUTH_SECRET,required=true \
    --mount=type=secret,id=AUTH_GITHUB_ID,env=AUTH_GITHUB_ID,required=true \
    --mount=type=secret,id=AUTH_GITHUB_SECRET,env=AUTH_GITHUB_SECRET,required=true \
    --mount=type=secret,id=AUTH_DISCORD_ID,env=AUTH_DISCORD_ID,required=true \
    --mount=type=secret,id=AUTH_DISCORD_SECRET,env=AUTH_DISCORD_SECRET,required=true \
    --mount=type=secret,id=AUTH_GOOGLE_ID,env=AUTH_GOOGLE_ID,required=true \
    --mount=type=secret,id=AUTH_GOOGLE_SECRET,env=AUTH_GOOGLE_SECRET,required=true \
    --mount=type=secret,id=S3_ENDPOINT,env=S3_ENDPOINT,required=true \
    --mount=type=secret,id=S3_REGION,env=S3_REGION,required=true \
    --mount=type=secret,id=S3_ACCESS_KEY,env=S3_ACCESS_KEY,required=true \
    --mount=type=secret,id=S3_SECRET_KEY,env=S3_SECRET_KEY,required=true \
    --mount=type=secret,id=S3_BUCKET,env=S3_BUCKET,required=true \
    npm run build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD HOSTNAME="0.0.0.0" node server.js