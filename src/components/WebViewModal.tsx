import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, RefreshCw, ArrowLeft, ArrowRight, Home, ExternalLink } from 'lucide-react';

interface WebViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export const WebViewModal = ({ isOpen, onClose, url, title }: WebViewModalProps) => {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    const iframe = document.getElementById('webview-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleHome = () => {
    setCurrentUrl(url);
    const iframe = document.getElementById('webview-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = url;
    }
  };

  const openExternal = () => {
    window.open(currentUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 glassmorphism border-white/20">
        <DialogHeader className="px-4 py-3 border-b border-white/10 bg-white/5">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-lg font-semibold">{title}</DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleHome}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <Home className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={openExternal}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="text-xs text-white/70 mt-1 truncate">{currentUrl}</div>
        </DialogHeader>
        
        <div className="flex-1 relative overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="loading-spinner w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          <iframe
            id="webview-iframe"
            src={currentUrl}
            className="w-full h-full border-none"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
            onLoad={() => setIsLoading(false)}
            style={{ backgroundColor: 'white' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};