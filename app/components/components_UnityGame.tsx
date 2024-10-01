'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    createUnityInstance: any;
  }
}

export default function UnityGame() {
  const [gameInstance, setGameInstance] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = "/unity/Build/UnityLoader.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleLoadGame = async () => {
    setIsLoading(true)
    try {
      const unityInstance = await window.createUnityInstance(
        document.getElementById('unity-canvas'),
        {
          dataUrl: "/unity/Build/WebGL.data",
          frameworkUrl: "/unity/Build/WebGL.framework.js",
          codeUrl: "/unity/Build/WebGL.wasm",
          streamingAssetsUrl: "StreamingAssets",
          companyName: "YourCompanyName",
          productName: "YourProductName",
          productVersion: "0.1",
        }
      )
      setGameInstance(unityInstance)
    } catch (error) {
      console.error("Error loading Unity game:", error)
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Unity WebGL Game</h1>
      {!gameInstance && (
        <Button onClick={handleLoadGame} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load Game'}
        </Button>
      )}
      <div id="unity-container" className="mt-4">
        <canvas id="unity-canvas" width={960} height={600} />
      </div>
    </div>
  )
}