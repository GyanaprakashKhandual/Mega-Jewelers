# 💎 Mega Jewelers - Complete Testing Project

This repository contains a comprehensive testing suite for the **Mega Jewelers Web Application**, covering multiple types of testing including Functional, API, Database, Manual, Performance, and Security testing.

## 📁 Project Structure

```plaintext
.
├── APIs
│   ├── data
│   │   └── API.json              # Contains mock API data
│   └── reports
│       ├── index.html            # API testing report (HTML)
│       ├── script.js             # JS for dynamic API report
│       └── style.css             # Styling for API report
│
├── Database
│   └── README.md                 # Database test cases, queries & results
│
├── Functional
│   ├── cypress
│   │   ├── e2e                   # End-to-End test cases
│   │   ├── support               # Cypress support files
│   │   ├── utils                 # Utility/helper functions
│   │   ├── cypress.config.js     # Cypress configuration
│   │   ├── package.json          # Project dependencies
│   │   └── README.md             # Overview of Functional testing strategy
│
├── Manual
│   └── README.md                 # Manual testing scenarios and cases
│
├── Performance
│   ├── Apis                      # Performance test scripts for APIs
│   └── Pages                     # Performance test scripts for UI pages
│
├── Report
│   ├── data                      # Report data files
│   ├── index.html                # Complete test report (HTML)
│   ├── script.js                 # JS for dynamic data population
│   └── style.css                 # Styling for report
│
├── Security
│   └── README.md                 # Security testing documentation
│
└── .gitignore                    # Git ignore rules
