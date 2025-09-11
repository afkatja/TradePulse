"use client"
import React, { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import { Maximize2, MessageCircle, X } from "lucide-react"
import ChatMessages from "./messages"
import QuickChatInput from "./quickInput"
import ChatDialog from "./chatDialog"

const Chat = ({
  isOpen,
  className,
}: {
  isOpen: boolean
  className?: string
}) => {
  const [inputValue, setInputValue] = useState("")
  const [showChatPanel, setShowChatPanel] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false)

  const { messages, sendMessage } = useChat()

  const handleChatToggle = () => {
    setShowChatPanel(!showChatPanel)
    setHasUnreadMessages(false)
  }

  const handleExpandToDialog = () => {
    setIsDialogOpen(true)
    setShowChatPanel(false)
  }
  return (
    <>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start transition-all duration-200 hover:cursor-pointer text-muted-foreground hover:text-foreground relative",
          !isOpen && "justify-center px-2",
          showChatPanel && "bg-secondary"
        )}
        onClick={handleChatToggle}
      >
        <MessageCircle className={cn("h-5 w-5", isOpen && "mr-3")} />
        {isOpen && <span className="truncate">AI Assistant</span>}
        {hasUnreadMessages && (
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </Button>
      {isOpen && showChatPanel && (
        <div className="border-t border-border bg-muted/30 flex flex-col max-h-60">
          <div className="flex items-center justify-between p-2 border-b border-border">
            <span className="text-sm font-medium">AI Chat</span>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExpandToDialog}
                className="h-6 w-6 p-0"
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChatPanel(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <ChatMessages isCompact messages={messages} />
          <QuickChatInput
            sendMessage={sendMessage}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
      )}
      <ChatDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendMessage}
        messages={messages}
      />
    </>
  )
}

export default Chat
