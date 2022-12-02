export interface IDataMapper<TEntity> {
    toEntity(data: any, select?: string[]): TEntity;
    toDatabase(entity: TEntity, select?: string[]): any;
}