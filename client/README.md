# Accord Medical Supplies - Client Feedback Form

A modern, multi-step feedback form for collecting client feedback with a professional medical-themed design.

![Accord Medical Supplies](/public/logo.svg)

## Features

- Multi-step form with visual progress indicator
- Responsive design optimized for all devices (mobile, tablet, desktop)
- Interactive star ratings for product/service feedback
- Digital signature capture with clear canvas option
- Real-time form validation with user-friendly feedback
- Smooth transitions and loading states
- Success confirmation page with animations
- Professional medical-themed design
- API integration with error handling

## Technologies Used

- React 18 with Hooks
- Vite for fast development and optimized builds
- Tailwind CSS for styling with custom theme
- Axios for API requests
- react-signature-canvas for signature capture
- Lucide React for icons

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/accord-medical-client.git
cd accord-medical-client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root:
```
VITE_API_URL=http://codewithseth.co.ke:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Integration

The feedback form is designed to work with a backend API. For development without a backend, a mock implementation is provided that simulates API responses.

To connect to a real backend, specify the API URL in your `.env` file.

## Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` folder.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Accord Medical Supplies Ltd. All rights reserved.

## Contact

For support or inquiries, please contact:
- Email: support@accordmedical.co.ke
- Website: [accordmedical.co.ke](https://accordmedical.co.ke)

## Form Steps

1. **Client Information** - Date, name, facility, sales rep
2. **Product & Service Feedback** - Rate quality, delivery, and service
3. **Client Experience** - Share challenges and suggestions
4. **Overall Satisfaction** - Recommendation likelihood
5. **Signatures** - Client and sales rep signatures

## Technologies

- React 18
- Vite
- Tailwind CSS v4
- Axios for API calls
- React Signature Canvas
- Lucide React icons
