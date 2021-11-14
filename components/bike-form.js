export default function BikeForm({
  bikeMake,
  onMakeChange,
  bikeModel,
  onModelChange,
  bikeYear,
  onYearChange,
  onSubmit
}) {
  return (
    <form onSubmit={onSubmit}>
      <label>Make
        <input
          name='make'
          value={bikeMake}
          placeholder='Make'
          onChange={onMakeChange}
        />
      </label>

      <label>Model
        <input
          name='model'
          value={bikeModel}
          placeholder='Model'
          onChange={onModelChange}
        />
      </label>

      <label>Production year
        <input
          name='year'
          value={bikeYear}
          placeholder='Year'
          onChange={onYearChange}
        />
      </label>

      <button type='submit'>Save bike</button>
    </form>
  )
}
