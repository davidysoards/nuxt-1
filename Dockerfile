FROM node:20.11.1-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production
ARG PORT=3000
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod=false --frozen-lockfile
RUN pnpm run build

FROM base
ENV PORT=$PORT
COPY --from=build /app/.output /app/.output

CMD [ "node", ".output/server/index.mjs" ]
