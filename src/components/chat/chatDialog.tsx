import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { MessageCircle, Send } from "lucide-react"
import ChatMessages from "./messages"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { UIMessage } from "ai"

const chatDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  inputValue,
  setInputValue,
  sendMessage,
  messages,
}: {
  isDialogOpen: boolean
  setIsDialogOpen: (isOpen: boolean) => void
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  sendMessage: ({ text }: { text: string }) => void
  messages: UIMessage[]
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-2xl min-h-[600px] max-h-[90dvh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>AI Trading Assistant</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0 overflow-hidden flex h-[80dvh]">
          <ChatMessages isCompact={false} messages={messages} />
        </div>
        <div className="border-t border-border p-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask AI..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  sendMessage({ text: inputValue })
                }
              }}
              className="flex-1"
            />
            <Button
              onClick={() => sendMessage({ text: inputValue })}
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            AI responses are for informational purposes only and should not be
            considered as financial advice.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default chatDialog
