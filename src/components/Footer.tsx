export default function Footer() {
    return (
        <footer id="footer" className="footer p-3 bg-white shadow-sm fixed-bottom">
            <span className="float-end">
                <small>&copy; {new Date().getFullYear()}, Reeinvent</small>
            </span>
        </footer>
    );
}
