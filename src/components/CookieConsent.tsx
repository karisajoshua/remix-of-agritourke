import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Cookie, Shield } from "lucide-react";

const COOKIE_KEY = "cookie_consent";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_PREFS: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(DEFAULT_PREFS);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const save = (preferences: CookiePreferences) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(preferences));
    setVisible(false);
    setManageOpen(false);
  };

  const acceptAll = () => save({ necessary: true, analytics: true, marketing: true });

  const rejectOptional = () => save({ necessary: true, analytics: false, marketing: false });

  const savePreferences = () => save(prefs);

  if (!visible) return null;

  return (
    <>
      {/* Banner */}
      <div className="fixed bottom-0 inset-x-0 z-[60] p-4 animate-in slide-in-from-bottom duration-500">
        <div className="max-w-4xl mx-auto bg-agri-dark border border-gray-700 rounded-lg shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Cookie className="h-8 w-8 text-agri-yellow shrink-0 mt-1 sm:mt-0" />
          <div className="flex-1">
            <p className="text-white font-inter text-sm leading-relaxed">
              We use cookies to enhance your browsing experience and analyze site traffic.
              You can choose which cookies to allow.{" "}
              <a
                href="/legal/Privacy_Policy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-agri-yellow underline hover:text-agri-green transition-colors"
              >
                Privacy Policy
              </a>
            </p>
          </div>
          <div className="flex gap-2 shrink-0 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setManageOpen(true)}
              className="flex-1 sm:flex-none border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Manage
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={rejectOptional}
              className="flex-1 sm:flex-none border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Reject Optional
            </Button>
            <Button
              size="sm"
              onClick={acceptAll}
              className="flex-1 sm:flex-none bg-agri-green hover:bg-agri-green/90 text-white"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>

      {/* Manage Preferences Dialog */}
      <Dialog open={manageOpen} onOpenChange={setManageOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-agri-green" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Choose which cookies you'd like to allow. Strictly necessary cookies cannot be disabled.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {/* Strictly Necessary */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-sm">Strictly Necessary</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Essential for the website to function. These cannot be turned off.
                </p>
              </div>
              <Switch checked disabled className="opacity-70" />
            </div>

            {/* Analytics */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-sm">Analytics Cookies</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Help us understand how visitors interact with the website to improve performance.
                </p>
              </div>
              <Switch
                checked={prefs.analytics}
                onCheckedChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />
            </div>

            {/* Marketing */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-sm">Marketing Cookies</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Used to deliver relevant advertisements and track campaign effectiveness.
                </p>
              </div>
              <Switch
                checked={prefs.marketing}
                onCheckedChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={rejectOptional}>
              Reject Optional
            </Button>
            <Button onClick={savePreferences} className="bg-agri-green hover:bg-agri-green/90 text-white">
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
