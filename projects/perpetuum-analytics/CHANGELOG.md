# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.4](https://github.com/nrozic/perpetuum-ng-analytics/compare/perpetuum-analytics@2.0.3...perpetuum-analytics@2.0.4) (2022-04-19)

**Note:** Version bump only for package perpetuum-analytics

## [2.0.3](https://github.com/nrozic/perpetuum-ng-analytics/compare/perpetuum-analytics@2.0.2...perpetuum-analytics@2.0.3) (2022-04-19)

**Note:** Version bump only for package perpetuum-analytics

## [2.0.2](https://github.com/nrozic/perpetuum-ng-analytics/compare/perpetuum-analytics@2.0.1...perpetuum-analytics@2.0.2) (2022-04-19)

**Note:** Version bump only for package perpetuum-analytics

## [2.0.1](https://github.com/nrozic/perpetuum-ng-analytics/compare/perpetuum-analytics@2.0.0...perpetuum-analytics@2.0.1) (2022-04-19)

**Note:** Version bump only for package perpetuum-analytics

# 2.0.0 (2022-04-19)

-   chore!: Deprecating reference to renderer in SetGoogleAnalyticsScript method ([850b3cf](https://github.com/nrozic/perpetuum-ng-analytics/commit/850b3cf07ec02bc152b0b4ecb5bb811e69554f2f))

### BREAKING CHANGES

-   renderer2 is not required as param for setGoogleAnalyticsScripts method
    chore: refactoring, some methods are now static, add Lerna in dev dependencies

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2019-02-10

### Added

-   PerpetuumAnalytics directive to enable easy way to send custom events
-   New interface IEventData

### Changed

-   Minor refactoring, list of input params in analytics service converted to object of type IEventData

## [1.0.2] - 2019-02-09

### Changed

-   Updated readme

## [1.0.1] - 2019-02-09

### Changed

-   Updated package.json file with missing properties required for npm registry

## [1.0.0] - 2019-02-09

### Added

-   Released initial stable version
