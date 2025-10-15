"use client"

import { useRef, useEffect, useState } from "react"
import SignaturePad from "react-signature-canvas"
import { RotateCcw, PenLine, Check } from "lucide-react"

export default function SignatureCanvas({ value, onChange }) {
  const sigPadRef = useRef(null)
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    if (value && sigPadRef.current) {
      sigPadRef.current.fromDataURL(value)
      setIsEmpty(false)
    }
  }, [])

  const handleEnd = () => {
    if (sigPadRef.current) {
      setIsEmpty(sigPadRef.current.isEmpty())
      const dataURL = sigPadRef.current.toDataURL()
      
      // For demo purposes, we'll just capture and truncate the signature data
      // In a real app, this would be sent to a server
      const truncatedDataURL = dataURL.substring(0, 50) + "..." + dataURL.substring(dataURL.length - 20)
      console.log("Signature captured (demo):", truncatedDataURL)
      
      onChange(dataURL)
    }
  }

  const handleClear = () => {
    if (sigPadRef.current) {
      sigPadRef.current.clear()
      setIsEmpty(true)
      onChange("")
    }
  }

  return (
    <div className="space-y-3">
      <div className={`relative border-2 ${isEmpty ? 'border-gray-300' : 'border-primary'} rounded-lg overflow-hidden bg-white transition-colors duration-300 shadow-sm`}>
        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center text-gray-400">
              <PenLine className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm">Sign here</p>
            </div>
          </div>
        )}
        <SignaturePad
          ref={sigPadRef}
          canvasProps={{
            className: "w-full h-48",
            style: { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
          }}
          onEnd={handleEnd}
          penColor="rgba(0, 0, 0, 0.8)"
        />
      </div>
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={handleClear}
          className="text-sm text-gray-600 hover:text-accent flex items-center gap-1 py-1 px-2 rounded hover:bg-gray-100 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Clear Signature
        </button>
        
        {!isEmpty && (
          <span className="flex items-center text-sm text-primary">
            <Check className="w-4 h-4 mr-1" />
            Signature captured
            <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-1.5 py-0.5 rounded">demo - not saved</span>
          </span>
        )}
      </div>
    </div>
  )
}
