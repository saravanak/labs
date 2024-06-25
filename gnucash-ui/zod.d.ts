// declare module "zod" {
//   interface ZodType {
//     metadata(): Record<string, any>;
//     associateMetadata(meta: Record<string, any>): this;
//   }
// }
// ZodType.prototype.metadata = function () {
//   return this._def.meta;
// };

// ZodType.prototype.associateMetadata = function (meta: Record<string, any>) {
//   const This = (this as any).constructor;
//   return new This({
//     ...this._def,
//     meta,
//   });
// };

// const obj = z.object({}).associateMetadata({ label: "hello" });
// console.log(obj.metadata().label);
