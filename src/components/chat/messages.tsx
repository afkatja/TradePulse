import { ScrollArea } from "../ui/scroll-area"
import React from "react"
import { cn } from "../../lib/utils"
import { UIMessage } from "ai"
import Markdown from "react-markdown"

const ChatMessages = ({
  isCompact = false,
  messages,
}: {
  isCompact: boolean
  messages: UIMessage[]
}) => {
  return (
    <ScrollArea>
      <div className="space-y-2 p-2 chat">
        {messages.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">Ask AI...</p>
        ) : (
          messages.map(message => (
            <div
              key={message.id}
              className={cn(
                "p-4 rounded",
                message.role === "user"
                  ? "bg-primary text-primary-foreground ml-16"
                  : "bg-muted"
              )}
            >
              {message.parts.map(part => (
                <div
                  key={part.id}
                  className={cn(isCompact ? "text-sm line-clamp-3" : "")}
                >
                  {/*TODO: render markdown*/}
                  <Markdown>{part.text}</Markdown>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  )
}

export default ChatMessages
