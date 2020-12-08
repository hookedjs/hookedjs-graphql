#!/bin/bash

[[ $1 = "--migrationsRebuild" ]] && MIGRATE_REBUILD_MODE=1

# Check if docker is running
check_docker() {
  docker_state=$(docker info >/dev/null 2>&1)
  if [[ $? -ne 0 ]]; then
      echo "Docker is no-bueno"
      exit 1
  fi
}

seed() {
  cd core/api
  if [ $MIGRATE_REBUILD_MODE ]; then
    rm -rf prisma/migrations &> /dev/null
    yarn prisma:save
  fi
  yarn prisma:apply
  yarn workspaces run seed
}

start() {
  check_docker
  docker rm -f nexus-pg &> /dev/null
  docker pull postgres:10.12
  # docker run will grab the image automatically, but it's
  docker run --name nexus-pg --publish 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:10.12 &
}

waitUntilPgReady() {
  echo "Waiting for PG to be ready..."
  # wait 10s to prevent a false positive that happens when docker pg
  # starts for the first time -- b/c it starts in safe mode then
  # restarts.
  sleep 10
  while ! nc -z localhost 5432; do
    sleep 0.1
  done
  echo "DB is now ready"
}

nc -z localhost 5432
if [[ "$?" -eq 1 ]]; then
  start
  waitUntilPgReady
  seed
  wait
fi