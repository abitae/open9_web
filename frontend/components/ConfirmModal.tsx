import React from 'react';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  danger = true,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onCancel} aria-hidden />
      <div
        className="relative bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 max-w-md w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
      >
        <h2 id="confirm-title" className="text-xl font-black text-slate-900 mb-2">
          {title}
        </h2>
        <p id="confirm-desc" className="text-slate-600 font-medium mb-8">
          {message}
        </p>
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-2xl font-black text-sm uppercase border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-6 py-3 rounded-2xl font-black text-sm uppercase transition-all ${danger ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-[#0a2e5c] text-white hover:bg-[#0d4285]'}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
