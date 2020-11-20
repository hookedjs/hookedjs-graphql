# HookedJS

<p align="center"><img src="https://github.com/hookedjs/hookedjs/blob/main/docs/hooked.png?raw=true" alt="Hookedjs" width="200"/></p>

A Scalable, all NodeJS Full-Stack boilerplate in a box: web+native+backend. Features bleeding-edge react + graphql.

## Status

Work In Progress

Roadmap: https://github.com/orgs/hookedjs/projects/1

## Install

As of now, HookedJS requires MacOS in order to build IOS apps.

1. [Install homebrew](https://brew.sh/)
2. [Install nvm](https://github.com/nvm-sh/nvm#install--update-script)
3. [Install Docker](https://docs.docker.com/docker-for-mac/install/)
1. Install Xcode from the App Store and open it to accept the user agreement.
2. Follow [the official React Native instructions](https://facebook.github.io/react-native/docs/getting-started.html) to configure your machine for IOS and Android using the "React Native CLI Quickstart" tab, NOT the "Expo CLI Quickstart" tab.

Then, install more dependencies and bootstrap

```
brew install gnu-sed
brew install watchman
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8
nvm install 14
nvm use 14
npm i -g yarn
yarn
yarn codegen
```

## Development

A local development env can be launched by (1) starting Docker and (2) running 

```
yarn dev
```

### Developing Native Apps

Coming soon

