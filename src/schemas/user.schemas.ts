import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  admin: z.boolean().default(false),
  active: z.boolean().default(true),
});

const userSchemaRequest = userSchema.omit({ id: true, active: true });

const userSchemaResponse = userSchema.omit({ password: true });

const userSchemaActive = userSchema.pick({ active: true });

const userSchemaAdmin = userSchema.pick({ admin: true });

const userSchemaPartial = userSchema.partial();
const userSchemaPartialRequest = userSchemaPartial.omit({
  active: true,
  admin: true,
  id: true,
});

export {
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
  userSchemaActive,
  userSchemaAdmin,
  userSchemaPartial,
  userSchemaPartialRequest,
};
