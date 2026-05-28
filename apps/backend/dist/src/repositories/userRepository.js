import { pgPool } from "../config/db.js";
export class UserRepository {
    async upsert(input) {
        const query = `
      INSERT INTO users (line_user_id, display_name, picture_url)
      VALUES ($1, $2, $3)
      ON CONFLICT (line_user_id)
      DO UPDATE SET
        display_name = EXCLUDED.display_name,
        picture_url = EXCLUDED.picture_url,
        updated_at = NOW()
      RETURNING id, line_user_id, display_name, picture_url, created_at, updated_at
    `;
        const result = await pgPool.query(query, [
            input.lineUserId,
            input.displayName,
            input.pictureUrl ?? null
        ]);
        const row = result.rows[0];
        return {
            id: row.id,
            lineUserId: row.line_user_id,
            displayName: row.display_name,
            pictureUrl: row.picture_url ?? undefined,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        };
    }
}
