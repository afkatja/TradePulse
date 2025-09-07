"use client"
import React, { useState } from "react"
import { useChat } from "@ai-sdk/react"

const Chat = ({ className }: { className?: string }) => {
  const [input, setInput] = useState("")
  const { messages, sendMessage } = useChat()
  return (
    <div className={`${className} flex flex-col w-full py-24`}>
      <h1 className="text-3xl font-bold text-foreground">Chat with AI</h1>
      {messages.map(message => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.parts.map((part, i) => {
            console.log("PART", part)

            switch (part.type) {
              case "text":
                if (message.role === "user") {
                  return (
                    <div className="bg-secondary rounded p-2 my-4">
                      <p className="text-right p-2 font-bold">You</p>
                      <p key={`${message.id}-${i}`}>{part.text}</p>
                    </div>
                  )
                } else
                  return (
                    <div className="bg-card rounded">
                      <p className="text-left bg-muted text-foreground p2">
                        AI
                      </p>
                      <p
                        key={`${message.id}-${i}`}
                        className="bg-card text-foreground p-2"
                      >
                        {part.text}
                      </p>
                    </div>
                  )
              case "tool-marketAnalysis":
                return (
                  <div
                    key={`${message.id}-${i}`}
                    className="bg-accent rounded p-2 my-4"
                  >
                    <p className="text-left p-2 font-bold">Market Analysis</p>
                    <p>{part.output as string}</p>
                  </div>
                )
            }
          })}
        </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault()
          sendMessage({ text: input })
          setInput("")
        }}
      >
        <input
          className="bg-input bottom-0 w-full p-2 mb-8 border border-border  rounded shadow-xl"
          value={input}
          placeholder="Ask AI..."
          onChange={e => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  )
}

export default Chat
