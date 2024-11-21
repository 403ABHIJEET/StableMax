import { User } from "@prisma/client";

declare module 'next-auth/jwt' {
    interface JWT {
        user: User
    }
}