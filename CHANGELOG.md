# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.1] - 2026-02-26

### Fixed

- Improved bootstrap for Culori CSS color modes

## [1.1.0] - 2026-02-15

### Added

- `HSV` color mode to bootstrap
- New `Color` class methods for `HSV`: `getValue`, `setValue`, `toHSV`

## [1.0.0] - 2026-02-14

### Added

- `useLocale()` function-based API replacing the `ColorNamer` class for locale registration
- Standalone functions: `nameColor()`, `nearestColors()`, `lookupColor()`, `listColorNames()`, `translateColor()`
- `getLocale()` to retrieve a registered locale dictionary
- Utility modules (`src/utils/`) for parsing, conversion, mixing, and color manipulation
- Comprehensive JSDoc documentation across all public APIs
- New `Color` class methods for channel introspection, mixing, and lightness adjustments

### Changed

- **Breaking:** Replaced `ColorNamer` class with module-level functions and `useLocale()` registration
- **Breaking:** Renamed/restructured public API exports from `index.ts`
- Improved `KDTree` documentation and type annotations
- Enhanced `ColorDictionary`, `ColorNameSet`, and related type documentation
- Expanded test coverage for `Color`, naming, and translation modules

### Removed

- `ColorNamer` class (replaced by standalone functions)
- `setup()` function (replaced by direct `useMode()` calls from culori)

## [0.1.4] - 2026-02-13

### Added

- New `Color` class methods for channel introspection, mixing, and lightness adjustments
- GitHub Release creation step in publish workflow

### Changed

- Removed `setup()` function in favor of direct culori `useMode()` calls
- Updated package description for enhanced locale-aware color naming

## [0.1.3] - 2026-02-13

### Added

- Bundle size tracking with `size-limit` dependencies and configuration

### Changed

- Updated Node.js version to 24 in publish workflow

## [0.1.2] - 2026-02-13

### Added

- GitHub Actions workflow for npm publishing

### Changed

- Updated package metadata

## [0.1.1] - 2026-02-13

### Added

- Installation instructions and usage examples in README

## [0.1.0] - 2026-02-13

### Added

- Initial release
- Immutable `Color` class wrapping culori color objects
- `ColorNamer` engine with k-d tree nearest-neighbor lookup in OkLab space
- Support for 74 languages from the UW multilingual color survey dataset
- Three naming tiers: `basic`, `extended`, `traditional`
- Color name translation between locales
- Tree-shakeable per-language locale dictionaries
- GitHub Actions workflow to sync upstream UW color data daily
- MIT License
