const Sidebar = () => {
    const languages = ["Spanish", "French", "German"];

    return (
        <div style={{ width: "250px", borderRight: "1px solid black" }}>
            <h2>Languages</h2>
            <ul>
                {languages.map((lang) => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
