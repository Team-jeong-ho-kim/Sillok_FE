FROM node:22-alpine AS builder

# 필요한 패키지 설치
RUN apk add --no-cache libc6-compat git curl unzip file

# ARG와 ENV 설정
ARG VITE_MAIN_URL
ARG VITE_SERVER_URL
ARG BRANCH=main

ENV VITE_MAIN_URL=${VITE_MAIN_URL}
ENV VITE_SERVER_URL=${VITE_SERVER_URL}
ENV BRANCH=${BRANCH}

# 파일 다운로드 및 압축 해제
RUN echo "Downloading from: https://github.com/Team-jeong-ho-kim/Sillok_FE/archive/refs/heads/${BRANCH}.zip" && \
    curl -L -o ../Sillok_FE.zip https://github.com/Team-jeong-ho-kim/Sillok_FE/archive/refs/heads/${BRANCH}.zip && \
    unzip ../Sillok_FE.zip -d / && \
    ls -l / && \
    ls -l /Sillok_FE-${BRANCH}

# Yarn 설정 및 빌드
WORKDIR /Sillok_FE-${BRANCH}
RUN corepack enable && corepack prepare yarn@4.5.3 --activate
RUN yarn set version berry
RUN yarn install

# 패키지 디렉터리 확인
WORKDIR /Sillok_FE-${BRANCH}/packages/user
RUN ls -l && yarn build

# 실행 단계
FROM nginx:alpine AS runner

ARG BRANCH
ENV BRANCH=${BRANCH}

RUN echo "\
server {\
    listen 3000;\
    location / {\
        root   /usr/share/nginx/html;\
        index  index.html index.html;\
        try_files \$uri \$uri/ /index.html =404;\
    }\
}" > /etc/nginx/conf.d/default.conf

COPY --from=builder /Sillok_FE-${BRANCH}/packages/user/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
