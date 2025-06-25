'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Terminal, Users, Eye, EyeOff, GitBranch, Check } from 'lucide-react'

interface Visitor {
  name: string
  timestamp: Date
  commitMessage: string
}

export function GitHubSimulator() {
  const [userName, setUserName] = useState('')
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [showVisitors, setShowVisitors] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const steps = [
    { command: 'git add .', description: 'Adicionando arquivos...', duration: 1000 },
    { command: `git commit -m "feat: ${userName} visited portfolio"`, description: 'Criando commit...', duration: 1500 },
    { command: 'git push origin main', description: 'Enviando para GitHub...', duration: 2000 }
  ]

  // Carregar visitantes do localStorage
  useEffect(() => {
    const savedVisitors = localStorage.getItem('portfolio-visitors')
    if (savedVisitors) {
      try {
        const parsed = JSON.parse(savedVisitors).map((v: { name: string; timestamp: string; commitMessage: string }) => ({
          ...v,
          timestamp: new Date(v.timestamp)
        }))
        setVisitors(parsed)
      } catch (error) {
        console.error('Error parsing visitors:', error)
      }
    }
  }, [])

  // Salvar visitantes no localStorage
  const saveVisitors = (newVisitors: Visitor[]) => {
    localStorage.setItem('portfolio-visitors', JSON.stringify(newVisitors))
    setVisitors(newVisitors)
  }

  const simulateCommit = async () => {
    if (!userName.trim()) return

    setIsSimulating(true)
    setCurrentStep(0)

    // Simular cada passo do git
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i)
      await new Promise(resolve => setTimeout(resolve, steps[i].duration))
    }

    // Adicionar visitante à lista
    const newVisitor: Visitor = {
      name: userName.trim(),
      timestamp: new Date(),
      commitMessage: `feat: ${userName.trim()} visited portfolio`
    }

    const updatedVisitors = [newVisitor, ...visitors].slice(0, 50) // Máximo 50 visitantes
    saveVisitors(updatedVisitors)

    setShowSuccess(true)
    setIsSimulating(false)
    setUserName('')

    // Ocultar mensagem de sucesso após 3 segundos
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text flex items-center justify-center gap-3">
          <Github className="w-8 h-8" />
          GitHub Commit Simulator
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Simule um commit no GitHub e deixe sua marca no portfólio do André! 
          Seu nome será adicionado à lista de visitantes.
        </p>
      </motion.div>

      {/* Main simulator */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-8 mb-8"
      >
        {/* Input section */}
        <div className="mb-6">
          <label htmlFor="userName" className="block text-sm font-medium text-foreground mb-2">
            Seu nome para o commit:
          </label>
          <div className="flex gap-3">
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Digite seu nome..."
              className="flex-1 bg-muted rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              disabled={isSimulating}
              onKeyPress={(e) => e.key === 'Enter' && simulateCommit()}
            />
            <motion.button
              onClick={simulateCommit}
              disabled={!userName.trim() || isSimulating}
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSimulating ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  Commitando...
                </>
              ) : (
                <>
                  <Terminal className="w-4 h-4" />
                  Fazer Commit
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Terminal simulation */}
        <AnimatePresence>
          {isSimulating && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 mb-6"
            >
              <div className="mb-2 text-white">
                <span className="text-blue-400">andre@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-yellow-400">~</span>
                <span className="text-white">$ </span>
              </div>
              
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentStep >= index ? 1 : 0.3 }}
                  className={`mb-1 ${currentStep === index ? 'text-yellow-400' : currentStep > index ? 'text-green-400' : 'text-gray-600'}`}
                >
                  <span className="text-white">$ </span>
                  {step.command}
                  {currentStep > index && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-2 text-green-400"
                    >
                      ✓
                    </motion.span>
                  )}
                  {currentStep === index && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="ml-1"
                    >
                      |
                    </motion.span>
                  )}
                </motion.div>
              ))}
              
              {currentStep < steps.length && (
                <div className="text-gray-400 text-xs mt-2">
                  {steps[currentStep]?.description}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center gap-3 text-green-400">
                <Check className="w-5 h-5" />
                <span className="font-medium">Commit realizado com sucesso!</span>
              </div>
              <p className="text-sm text-green-300 mt-1">
                Seu nome foi adicionado à lista de visitantes do portfólio.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Visitors section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5" />
            Visitantes do Portfólio
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {visitors.length} visitante{visitors.length !== 1 ? 's' : ''}
            </span>
            <motion.button
              onClick={() => setShowVisitors(!showVisitors)}
              className="flex items-center gap-2 px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showVisitors ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Ocultar
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Mostrar
                </>
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {showVisitors && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {visitors.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {visitors.map((visitor, index) => (
                    <motion.div
                      key={`${visitor.name}-${visitor.timestamp.getTime()}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <GitBranch className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{visitor.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {visitor.timestamp.toLocaleDateString('pt-BR')} às{' '}
                            {visitor.timestamp.toLocaleTimeString('pt-BR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">
                          {visitor.commitMessage}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Seja o primeiro a fazer um commit!</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
} 