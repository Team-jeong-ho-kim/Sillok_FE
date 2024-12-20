# 빌드 단계
FROM node:22-alpine AS builder

# 필요한 패키지 설치
RUN apk add --no-cache libc6-compat git curl unzip

# 환경 변수 설정
ARG VITE_MAIN_URL
ARG VITE_SERVER_URL

ENV VITE_MAIN_URL=${VITE_MAIN_URL}
ENV VITE_SERVER_URL=${VITE_SERVER_URL}

# 브랜치 설정
ARG BRANCH
ENV BRANCH=${BRANCH}

# GitHub 저장소에서 소스 다운로드 및 압축 해제
RUN curl -L -o ../Sillok_FE.zip https://github.com/Team-jeong-ho-kim/Sillok_FE/archive/${BRANCH}.zip && \
    unzip ../Sillok_FE.zip -d /

# Yarn 설정
RUN corepack enable && corepack prepare yarn@4.5.3 --activate

# 작업 디렉토리 변경
WORKDIR /Sillok_FE-${BRANCH}

# Yarn Berry 버전 사용
RUN yarn set version berry
RUN yarn install

# 특정 패키지 경로로 이동 후 빌드
WORKDIR /Sillok_FE-${BRANCH}/packages/user
RUN yarn build

# 실행 단계
FROM nginx:alpine AS runner

# 브랜치 환경 변수 설정
ARG BRANCH
ENV BRANCH=${BRANCH}

# Nginx 설정 파일 작성
RUN echo "\
server {\
    listen 3000;\
    location / {\
        root   /usr/share/nginx/html;\
        index  index.html index.html;\
        try_files \$uri \$uri/ /index.html =404;\
    }\
}" > /etc/nginx/conf.d/default.conf

# 빌드 결과물 복사
COPY --from=builder /Sillok_FE-${BRANCH}/packages/user/build /usr/share/nginx/html

# 포트 노출
EXPOSE 3000

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
