import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Inject Botpress Webchat
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    // Inject Botpress Chatbot Behavior Script
    const script2 = document.createElement("script");
    script2.src = "https://files.bpcontent.cloud/2025/02/10/10/20250210101503-7I80ARSF.js";
    script2.async = true;
    document.body.appendChild(script2);

    script1.onload = () => {
      window.botpressWebChat.init({
        botId: "your-bot-id", // Replace with your actual Botpress bot ID
        host: "https://cdn.botpress.cloud/webchat",
        showCloseButton: true,
        showOpenButton: false, // Hide Botpress default button
      });
    };
  }, []);

  return (
    <div>
      {/* Keep the existing chatbot button */}
      <button
        onClick={() => window.botpressWebChat.sendEvent({ type: "show" })}
        className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg"
      >
        💬 Chat
      </button>
    </div>
  );
};

export default Chatbot;
