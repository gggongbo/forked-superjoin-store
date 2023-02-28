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

// eslint-disable-next-line import/prefer-default-export
export { useConfirm };
