# Pulse Of The Underground

![Pulse Of The Underground](./src/assets/PulseOfTheUnderground-removebg-preview.png)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)

## Introduction

Welcome to Pulse Of The Underground, a dynamic news site dedicated to providing the latest and most engaging content. This project aims to create a community-driven platform where users can read, interact, and contribute news articles. We welcome contributions from developers of all levels to help us grow and improve the site.

## Features

- **User Authentication and Management**: Secure login and registration system.
- **Dynamic Content**: Load and display articles dynamically.
- **Responsive Design**: Optimized for all devices.
- **Social Media Integration**: Integrate with platforms like Facebook and YouTube.
- **Admin System**: Comprehensive admin features for managing content.
- **Customizable User Profiles**: Users can create and manage their profiles.
- **Commenting and Interaction**: Users can comment on articles and interact with each other.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/pulse-of-the-underground.git
   cd pulse-of-the-underground
   ```

2. **Install dependencies**
   ```sh
   npm install
   cd functions
   npm install
   cd ..
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the necessary environment variables (To interact with the cloudflare dns and firebase hosting):
   ```plaintext
   REACT_APP_USE_EMULATORS=true
   REACT_APP_RELEASE=
   ADMIN_SDK=
   FIREBASE_TOKEN=
   ZONE_ID=
   TOKEN=
   ```

4. **Run the development server**
   ```sh
   npm start
   ```

## Usage

After setting up the project, you can start the development server using `npm start`. The app will be available at `http://localhost:3000`.

## Contributing

We welcome contributions! Follow these steps to contribute:

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature/your-feature-name`)
3. **Commit your changes** (`git commit -m 'Add some feature'`)
4. **Push to the branch** (`git push origin feature/your-feature-name`)
5. **Open a pull request**

Please ensure your code adheres to our coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.