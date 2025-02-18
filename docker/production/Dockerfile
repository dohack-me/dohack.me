FROM node:18-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY prisma/schema.prisma ./prisma/schema.prisma
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN npm ci

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN --mount=type=secret,id=NEXT_PUBLIC_BACKEND_HOST,required=true \
    echo "NEXT_PUBLIC_BACKEND_HOST=$(cat /run/secrets/NEXT_PUBLIC_BACKEND_HOST)" >> .env.production
RUN --mount=type=secret,id=NEXT_PUBLIC_POSTHOG_KEY,required=true \
    echo "NEXT_PUBLIC_POSTHOG_KEY=$(cat /run/secrets/NEXT_PUBLIC_POSTHOG_KEY)" >> .env.production
RUN --mount=type=secret,id=NEXT_PUBLIC_POSTHOG_HOST,required=true \
    echo "NEXT_PUBLIC_POSTHOG_HOST=$(cat /run/secrets/NEXT_PUBLIC_POSTHOG_HOST)" >> .env.production

RUN --mount=type=secret,id=BACKEND_URL,required=true \
    echo "BACKEND_URL=$(cat /run/secrets/BACKEND_URL)" >> .env.production
RUN --mount=type=secret,id=BACKEND_SECRET_KEY,required=true \
    echo "BACKEND_SECRET_KEY=$(cat /run/secrets/BACKEND_SECRET_KEY)" >> .env.production

RUN --mount=type=secret,id=DATABASE_URL,required=true \
    echo "DATABASE_URL=$(cat /run/secrets/DATABASE_URL)" >> .env.production
RUN --mount=type=secret,id=DIRECT_URL,required=true \
    echo "DIRECT_URL=$(cat /run/secrets/DIRECT_URL)" >> .env.production

RUN --mount=type=secret,id=AUTH_TRUST_HOST,required=true \
    echo "AUTH_TRUST_HOST=$(cat /run/secrets/AUTH_TRUST_HOST)" >> .env.production
RUN --mount=type=secret,id=AUTH_URL,required=true \
    echo "AUTH_URL=$(cat /run/secrets/AUTH_URL)" >> .env.production
RUN --mount=type=secret,id=AUTH_SECRET,required=true \
    echo "AUTH_SECRET=$(cat /run/secrets/AUTH_SECRET)" >> .env.production \
RUN --mount=type=secret,id=AUTH_GITHUB_ID,required=true \
    echo "AUTH_GITHUB_ID=$(cat /run/secrets/AUTH_GITHUB_ID)" >> .env.production
RUN --mount=type=secret,id=AUTH_GITHUB_SECRET,required=true \
    echo "AUTH_GITHUB_SECRET=$(cat /run/secrets/AUTH_GITHUB_SECRET)" >> .env.production
RUN --mount=type=secret,id=AUTH_DISCORD_ID,required=true \
    echo "AUTH_DISCORD_ID=$(cat /run/secrets/AUTH_DISCORD_ID)" >> .env.production
RUN --mount=type=secret,id=AUTH_DISCORD_SECRET,required=true \
    echo "AUTH_DISCORD_SECRET=$(cat /run/secrets/AUTH_DISCORD_SECRET)" >> .env.production
RUN --mount=type=secret,id=AUTH_GOOGLE_ID,required=true \
    echo "AUTH_GOOGLE_ID=$(cat /run/secrets/AUTH_GOOGLE_ID)" >> .env.production
RUN --mount=type=secret,id=AUTH_GOOGLE_SECRET,required=true \
    echo "AUTH_GOOGLE_SECRET=$(cat /run/secrets/AUTH_GOOGLE_SECRET)" >> .env.production

RUN --mount=type=secret,id=S3_ENDPOINT,required=true \
    echo "S3_ENDPOINT=$(cat /run/secrets/S3_ENDPOINT)" >> .env.production
RUN --mount=type=secret,id=S3_REGION,required=true \
    echo "S3_REGION=$(cat /run/secrets/S3_REGION)" >> .env.production
RUN --mount=type=secret,id=S3_ACCESS_KEY,required=true \
    echo "S3_ACCESS_KEY=$(cat /run/secrets/S3_ACCESS_KEY)" >> .env.production
RUN --mount=type=secret,id=S3_SECRET_KEY,required=true \
    echo "S3_SECRET_KEY=$(cat /run/secrets/S3_SECRET_KEY)" >> .env.production
RUN --mount=type=secret,id=S3_BUCKET,required=true \
    echo "S3_BUCKET=$(cat /run/secrets/S3_BUCKET)" >> .env.production

RUN npm run build

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
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]