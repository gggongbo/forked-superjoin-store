const errorMessage = {
  firebase: {
    internal: {
      'already-confirmed': 'already-confirmed',
      'invalid-status': 'invalid-status',
      'already-canceled': 'already-canceled',
      'already-deleted': 'already-deleted',
      'exceeded-num-of-user': 'exceeded-num-of-user',
      'already-visited': 'already-visited',
      'calls-of-users-not-found': 'calls-of-users-not-found',
    },
  },
};

type ErrorMessage = typeof errorMessage;

export default errorMessage as ErrorMessage;
