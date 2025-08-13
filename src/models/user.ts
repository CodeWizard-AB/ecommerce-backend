import { model, Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

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
	shippingAddress: IAddress;
	billingAddress: IAddress;
	passwordChangedAt: Date;
	passwordResetToken: string;
	passwordResetExpire: Date;
	refreshTokens: string[];
	mfaEnabled: boolean;
	mfaSecret: string;
	emailVerified: boolean;
	emailVerificationToken: string;
	emailVerificationExpire: Date;
	active: boolean;
}

interface IUserDocument extends IUser, Document {
	matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>(
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
		refreshTokens: { type: [String], select: false },
		mfaEnabled: { type: Boolean, default: false },
		mfaSecret: { type: String, select: false },
		emailVerified: { type: Boolean, default: false },
		emailVerificationToken: String,
		emailVerificationExpire: Date,	
		active: {
			type: Boolean,
			default: true,
			select: false, 
		},
	},
	{ timestamps: true }
);

// ? Schema Middleware
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		const salt = bcrypt.genSaltSync(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});

// ? Schema Methods
userSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// ? Schema Virtuals
userSchema
	.virtual("passwordConfirm")
	.get(function () {
		return (this as any).passwordConfirm;
	})
	.set(function (value: string) {
		(this as any).passwordConfirm = value;
	});

userSchema.pre("validate", function (next) {
	if (
		this.isModified("password") &&
		(this as any).passwordConfirm !== this.password
	) {
		this.invalidate("password", "Passwords do not match");
	}
	next();
});

const User: Model<IUserDocument> = model<IUserDocument>("User", userSchema);

export default User;
