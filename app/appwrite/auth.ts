import { account, appwriteConfig, database } from "./client"
import { ID, OAuthProvider, Query } from "appwrite"
import { redirect } from "react-router"

export const getExistingUser = async (id: string) => {
    try {
        const { documents, total } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', id)]
        )
        return total > 0 ? documents[0] : null
    } catch (error) {
        console.log('Error fetching user data:', error)
    }
}

export const storeUserData = async () => {
    try {
        const user = await account.get()
        if (!user) throw new Error('User not found')

        const { providerAccessToken } = account.getSession('current') || {}
        const profilePicture = providerAccessToken ? await getGooglePicture(providerAccessToken) : null

        const createdUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: user.$id,
                name: user.name,
                email: user.email,
                imageUrl: profilePicture,
                joinedAt: new Date().toISOString()
            }
        )

        if (!createdUser) redirect('/sign-in')
    } catch (error) {
        console.log('Error to store user data:', error)
    }
}

export const getGooglePicture = async (accessToken: string) => {
    try {
        const response = await fetch(
            "https://people.googleapis.com/v1/people/me?personFields=photos",
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch Google Profile Picture");

            const { photos } = await response.json();
            return photos?.[0]?.url || null;
        }
    } catch (error) {
        console.log('Error fetching Google Profile Picture:', error)
        return null;
    }
}

export const loginWithGoogle = async () => {
    try {
        account.createOAuth2Session(OAuthProvider.Google,
            // `${window.location.origin}/`,
            // `${window.location.origin}/404`
        )
    } catch (error) {
        console.log('Error duting Oath2 session:', error)
    }
}

export const logoutUser = async () => {
    try {
        await account.deleteSession('current')
    } catch (error) {
        console.log('Error during logout:', error)
    }
}

export const getUser = async () => {
    try {
        const user = await account.get()
        if (!user) return redirect('/sign-in')

        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [
                Query.equal('accountId', user.$id),
                Query.select(['name', 'email', 'imageUrl', 'joinedAt', 'accountId'])
            ]
        )

        return documents.length > 0 ? documents[0] : redirect('/sign-in')
    } catch (error) {
        console.log('Error fetching user data:', error)
    }
}

export const getAllUsers = async (limit: number, offset: number) => {
    try {
        const { documents: users, total } = database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [
                Query.limit(100),
                Query.offset(offset)
            ]
        )

        if (total === 0) return { users: [], total }
        return { users, total }

    } catch (error) {
        console.log('Error fetching user data:', error)
    }
}