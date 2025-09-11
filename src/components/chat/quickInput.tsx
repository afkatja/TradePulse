import React from "react"
import { Send } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const QuickChatInput = ({
  inputValue,
  setInputValue,
  sendMessage,
}: {
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  sendMessage: ({ text }: { text: string }) => void
}) => {
  return (
    <div className="p-3 border-t border-border">
      <div className="flex space-x-2">
        <Input
          placeholder="Ask AI..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={e => {
            if (e.key === "Enter") {
              sendMessage({ text: inputValue })
              setInputValue("")
            }
          }}
          className="flex-1 h-8 text-sm"
        />
        <Button
          size="sm"
          onClick={() => sendMessage({ text: inputValue })}
          disabled={!inputValue.trim()}
          className="h-8 w-8 p-0"
        >
          <Send className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}

export default QuickChatInput
