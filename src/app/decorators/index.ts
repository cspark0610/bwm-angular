export function AppDecorator(config: any) {
  console.log(config.message);
  return function (target: any) {
    console.log('Decorated- class', target);
    target.prototype.hello = 'Hello from decorator';
  };
}
