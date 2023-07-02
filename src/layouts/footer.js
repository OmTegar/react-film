function Footer() {
  const footerStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    padding: "10px",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
  };

  return (
    <footer className="footer" style={footerStyle}>
      <div className="container">
        <p>&copy; 2023 Streaming Film. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
