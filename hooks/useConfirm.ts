const useConfirm = () => {
  const confirm = (
    message: string | null = null,
    onConfirm: Function = () => {},
    onCancel: Function = () => {},
  ) => {
    if (window.confirm(message ?? 'no message')) {
      onConfirm();
    } else {
      onCancel();
    }
  };

  return confirm;
};

export { useConfirm };
