# Wedding Celebration Portal

A comprehensive wedding website featuring both an admin panel and guest interface, built with React, TypeScript, and Tailwind CSS.

## Features

### Admin Panel
- **Dashboard**: Overview of guest statistics and quick settings
- **Photo Gallery Management**: Upload and manage wedding photos
- **Guest Management**: Track attendance, meal service, and seating
- **Menu Management**: Manage food and drink items with categories
- **Asoebi Management**: Wedding attire catalog with pricing
- **Registry & Payments**: Gift registry and payment details management

### Guest Interface
- **Welcome Page**: Personalized greeting and event information
- **Photo Gallery**: View couple's photos
- **Seating**: View assigned seat and confirm arrival
- **Menu**: Select food and drinks from available options
- **Asoebi**: Browse and order wedding attire
- **Registry**: View gift registry and make contributions
- **Contact**: Venue information and contact details

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd wedding-celebration-portal
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Default Login Credentials
- **Admin**: Use access code `ADMIN`
- **Guest**: Generate guest codes through the admin panel

## Deployment

This project is configured for deployment on Netlify with continuous deployment from Git.

### Manual Deployment
```bash
npm run build
```

### Continuous Deployment
1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── common/         # Common UI components
│   ├── food/           # Food menu components
│   ├── gallery/        # Photo gallery components
│   └── seating/        # Seating chart components
├── context/            # React context for state management
├── pages/              # Page components
│   ├── admin/          # Admin panel pages
│   └── guest/          # Guest interface pages
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── main.tsx           # Application entry point
```

## Features in Detail

### Access Control
- Secure 5-character alphanumeric access codes
- Separate admin and guest interfaces
- Session-based authentication

### Guest Management
- Support for up to 300 guests
- Unique access codes for each guest
- Seat assignment and tracking
- Arrival confirmation
- Meal and drink service tracking

### Menu System
- Categorized food items (main course, appetizers, desserts)
- Categorized drinks (alcoholic, non-alcoholic, water)
- Guest selection tracking
- Image support for all menu items

### Payment Integration
- WhatsApp contact integration
- Bank account details for transfers
- Gift registry with contribution tracking

## Technologies Used

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Notifications**: React Toastify
- **Build Tool**: Vite
- **Deployment**: Netlify

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please contact the development team or create an issue in the repository.