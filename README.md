# Flow FX - Currency Converter

A modern, lightweight currency converter web application built with vanilla HTML, CSS, and JavaScript. Get real-time exchange rates with zero hidden fees, inspired by the design of Wise.com.

**Live Site:** [https://yaqubumar.github.io/flowfx/](https://yaqubumar.github.io/flowfx/)

## Features

✨ **Real-Time Conversion** - Converts currency instantly as you type  
💱 **100+ Currencies** - Access to all major world currencies  
🌙 **Dark Mode** - Toggle between light and dark themes with persistent storage  
⚡ **No Hidden Fees** - See actual exchange rates from the market  
📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile  
♿ **Accessible** - Built with WCAG accessibility standards  
🔄 **Currency Swap** - Quickly swap "from" and "to" currencies  
⚙️ **Zero Configuration** - Just open and use, no API keys required

## How to Use

1. Visit [https://yaqubumar.github.io/flowfx/](https://yaqubumar.github.io/flowfx/)
2. Enter the amount you want to convert
3. Select the currency you're converting from
4. Select the currency you're converting to
5. See the real-time conversion result instantly
6. Use the swap button (⇄) to quickly reverse currencies
7. Toggle dark mode with the moon icon in the header

## Technology Stack

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern styling with CSS variables and responsive design
- **JavaScript (ES6+)** - Vanilla JS with async/await for API calls
- **Frankfurter API** - Free, open-source exchange rate data

## API

This project uses the free [Frankfurter API](https://www.frankfurter.app) for exchange rates:
- No authentication required
- No rate limits for reasonable usage
- Real-time exchange rates
- Supports 30+ currencies

## Project Structure

```
flowfx/
├── index.html                 # Main HTML file
├── asset/
│   ├── css/
│   │   └── styles.css        # CSS styling
│   └── js/
│       └── script.js         # JavaScript functionality
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Pages deployment workflow
└── README.md                 # This file
```

## Installation & Local Development

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required!

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yaqubumar/flowfx.git
   cd flowfx
   ```

2. **Open in browser:**
   - Double-click `index.html`, or
   - Right-click `index.html` → "Open with" → your browser, or
   - Use a local server (optional):
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (with http-server)
     npx http-server
     ```

3. **Access locally:**
   - Direct: Open `index.html` in your browser
   - Server: Navigate to `http://localhost:8000`

## Features in Detail

### Real-Time Conversion
- Conversion happens automatically as you type
- No need to click a button
- Instant feedback with exchange rate display

### Theme Persistence
- Your theme preference is saved to browser storage
- Automatically loads your preferred theme on next visit
- Smooth transitions between themes

### Currency Swap
- Quick button to swap source and currency
- Maintains conversion instantly after swap
- Animated rotation effect on button

### Error Handling
- Validates user input before conversion
- Clear error messages
- Graceful handling of API failures

### Responsive Design
- Mobile-first approach
- Works perfectly on all screen sizes
- Touch-friendly interface

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Size:** ~10KB total (HTML, CSS, JS combined)
- **Load Time:** < 1 second
- **Dependencies:** Zero external dependencies
- **Caching:** Leverages browser caching

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Known Limitations

- Exchange rates are updated once per day by Frankfurter API
- Requires internet connection to fetch exchange rates
- Browser storage used for theme preference only

## Future Enhancements

- [ ] Historical exchange rate charts
- [ ] Saved conversion history
- [ ] Multiple currency conversion
- [ ] Offline mode with last known rates
- [ ] PWA support for mobile app installation
- [ ] More theme options

## License

This project is open source and available under the MIT License.

## Acknowledgments

- **Frankfurter API** - For providing free, reliable exchange rate data
- **Wise.com** - Design inspiration for the user interface
- Built with ❤️ using vanilla web technologies

## Support

For issues, suggestions, or questions:
- Open an issue on [GitHub Issues](https://github.com/yaqubumar/flowfx/issues)
- Check existing issues before opening a new one

## Deployment

This site is automatically deployed to GitHub Pages whenever you push to the `main` branch. The deployment workflow is configured in `.github/workflows/deploy.yml`.

### Deploy Your Own Fork

1. Fork this repository
2. Enable GitHub Pages in Settings → Pages
3. Select `main` branch and `/ (root)` folder
4. Your site will be live at `https://your-username.github.io/flowfx/`

---

**Made with ❤️ for people on the go** | [Live Demo](https://yaqubumar.github.io/flowfx/)
