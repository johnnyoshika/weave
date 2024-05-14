
CREATE TABLE feedback (
    /*
    `id`: The unique identifier for the feedback. This is a UUID.
    */
    id String,

    /*
    `project_id`: The project identifier for the call. This is an internal
    identifier that matches the project identifier in the W&B API.
    It is stored for feedback to allow efficient permissions filtering.
    */
    project_id String,

    /*
    `call_id`: The unique identifier for the call. This is typically a UUID.
    */
    call_id String,

    /*
    `wb_user_id`: The ID of the user that created the call. This is the ID of the user in the
    W&B API.
    */
    wb_user_id String NULL,

    /*
    `created_at`: The time that the row was inserted into the database.
    */
    created_at DateTime64(3) DEFAULT now64(3),

    /*
    `feedback_type`: The type of feedback that was given. The prefix "wandb." is reserved for our use.
    */
    feedback_type String,

    /*
    `notes`: An optional comment associated with the feedback.
    */
    notes String NULL,

    /*
    `feedback`: A dictionary of values that represent the feedback.
    The schema of this dictionary is determined by the feedback_type.
    */
    feedback String NULL,


) ENGINE = ReplacingMergeTree()
ORDER BY (project_id, call_id, created_at);
