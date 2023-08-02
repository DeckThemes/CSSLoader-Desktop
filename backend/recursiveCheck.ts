export async function recursiveCheck(
  testFunc: any,
  onTrue: any,
  onFirstFalse: any
) {
  const recursive = async () => {
    const value = await testFunc();
    if (value) {
      onTrue();
      return;
    } else
      setTimeout(() => {
        recursive();
      }, 1000);
  };

  const value = await testFunc();
  if (value) {
    onTrue();
    return;
  } else {
    onFirstFalse();
    recursive();
  }
}
