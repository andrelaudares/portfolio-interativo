'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, X, Bot, User, Sparkles } from 'lucide-react'
import { aiService } from '@/lib/ai-service'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Mensagem de boas-vindas quando abre o chat
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: "Oi! 👋 Eu sou o assistente pessoal do André Laudares! Posso te contar tudo sobre a carreira, projetos e habilidades dele. O que você gostaria de saber?",
        isUser: false,
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length])

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await aiService.sendMessage(inputValue)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Ops! Tive um problema aqui, mas posso te dizer que o André é incrível! Tenta me perguntar sobre os projetos dele ou a experiência na Altivus AI! 😊",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const suggestedQuestions = [
    "Conte sobre o projeto VeTech",
    "Qual a experiência na Altivus AI?",
    "Quais são as principais habilidades?",
    "Como posso entrar em contato?"
  ]

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary hover:bg-primary/90 rounded-full shadow-lg flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          rotate: isOpen ? 180 : 0,
          backgroundColor: isOpen ? '#ef4444' : '#3b82f6'
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-40 w-80 h-96 bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-primary/10 border-b border-border p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Assistente do André</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {aiService.isConfigured() ? 'Powered by Gemini AI' : 'Modo Demonstração'}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-64">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${
                    message.isUser ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isUser 
                        ? 'bg-primary text-white' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {message.isUser ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-3 py-2 ${
                      message.isUser
                        ? 'bg-primary text-white'
                        : 'bg-muted text-foreground'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-2xl px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggested questions (only when no user messages) */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <p className="text-xs text-muted-foreground text-center">Sugestões:</p>
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setInputValue(question)}
                      className="w-full text-left text-xs bg-primary/5 hover:bg-primary/10 text-primary rounded-lg px-3 py-2 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {question}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Pergunte sobre o André..."
                  className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-10 h-10 bg-primary hover:bg-primary/90 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 