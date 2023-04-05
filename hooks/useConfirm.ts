import { useCallback } from 'react';

const useConfirm = () => {
  const confirm = useCallback(
    (
      message: string | null = null,
      onConfirm: Function = () => {},
      onCancel: Function = () => {},
    ) => {
      if (window.confirm(message ?? 'no message')) {
        onConfirm();
      } else {
        onCancel();
      }
    },
    [],
  );

  return { confirm };
};

export { useConfirm };
