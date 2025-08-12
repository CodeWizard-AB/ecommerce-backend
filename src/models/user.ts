import { model, Schema, Document } from "mongoose";

export interface IAddress {
	street: string;
	city: string;
	state: string;
	country: string;
	zip: string;
}

export interface IUser extends Document {
	name: string;
	email: string;
	photo: string;
	role: "user" | "admin";
	password: string;
	passwordConfirm: string;
	shippingAddress: IAddress;
	billingAddress: IAddress;
	passwordChangedAt?: Date;
	passwordResetToken?: string;
	passwordResetExpire?: Date;
	refreshToken: string;
	mfaEnabled: boolean;
	mfaSecret: string;
	emailVerified: boolean;
}

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, "Please tell us your name"],
			trim: true,
			minlength: 2,
			maxlength: 50,
		},
		email: {
			type: String,
			required: [true, "Please provide your email"],
			unique: true,
			trim: true,
			lowercase: true,
		},
		photo: {
			type: String,
			default: "default.jpg",
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		password: {
			type: String,
			required: [true, "Please provide a password"],
			select: false,
			minlength: 8,
		},
		passwordConfirm: {
			type: String,
			required: [true, "Please confirm your password"],
			validate: {
				validator: function (el: string) {
					return el === this.password;
				},
				message: "Passwords are not the same!",
			},
		},
		shippingAddress: {
			street: { type: String },
			city: { type: String },
			state: { type: String },
			country: { type: String },
			zip: { type: String },
		},
		billingAddress: {
			street: { type: String },
			city: { type: String },
			state: { type: String },
			country: { type: String },
			zip: { type: String },
		},
		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpire: Date,
		refreshToken: { type: String, select: false },
		mfaEnabled: { type: Boolean, default: false },
		mfaSecret: { type: String, select: false },
		emailVerified: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
