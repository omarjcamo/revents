export const userDetailedQuery = ({auth, userUid}) => {
  if (userUid !== null) {
    return [
      {
        collection: 'users',
        doc: userUid,
        storeAs: 'profile'
      },
      {
        collection: 'users',
        doc: userUid,
        subcollections: [{collection: 'photos'}],
        storeAs: 'photos'
      },
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{collection: 'following'}],
        storeAs: 'following'
      }
    ];
  } else {
    return [
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{collection: 'photos'}],
        storeAs: 'photos'
      }
    ];
  }
};

export const peopleDashboardQuery = ({userUid}) => {
  return [
    {
      collection: 'users',
      doc: userUid,
      subcollections: [{collection: 'following'}],
      storeAs: 'following'
    },
    {
      collection: 'users',
      doc: userUid,
      subcollections: [{collection: 'followers'}],
      storeAs: 'followers'
    }
  ]
}