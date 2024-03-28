FROM node:20.11.1-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ARG PORT=3000
RUN corepack enable
WORKDIR /app

FROM base AS build
COPY . /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN npx drizzle-kit push:sqlite
ENV NODE_ENV=production
RUN pnpm run build

FROM base
ENV PORT=$PORT
COPY --from=build /app/.output /app/.output
COPY --from=build /app/sqlite.db /app/sqlite.db

CMD [ "node", ".output/server/index.mjs" ]
