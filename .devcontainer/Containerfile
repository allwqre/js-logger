FROM alpine:latest

RUN apk add sudo git openssh gpg nodejs npm

ARG USER=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG HOME=/home/$USER

RUN addgroup -g $USER_GID $USER && \
  adduser -D -G $USER $USER && \
  echo $USER ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USER && \
  chmod 0440 /etc/sudoers.d/$USER

USER $USER
