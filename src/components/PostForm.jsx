import { useNavigate } from "react-router-dom";

function PostForm({
  formData,
  onChange,
  onSubmit,
  isEditing = false,
  onDelete,
}) {
  const navigate = useNavigate();

  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <div>
        <label className="block font-medium mb-1">Qué servicio ofreces?*</label>
        <input
          type="text"
          name="service"
          value={formData.service}
          onChange={onChange}
          className="w-full bg-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">
          Descripción*{" "}
          <span className="text-md text-gray-400">
            (Describe brevemente tu servicio)
          </span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          className="w-full bg-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">
          Ubicación*{" "}
          <span className="text-md text-gray-400">
            (En qué parte de la ciudad te encuentras?)
          </span>
          <select
            name="location"
            value={formData.location}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Selecciona una ubicación</option>
            <option value="paris 1">Paris 1 - Louvre</option>
            <option value="paris 2">Paris 2 - Bourse</option>
            <option value="paris 3">Paris 3 - Temple</option>
            <option value="paris 4">Paris 4 - Hôtel-de-Ville</option>
            <option value="paris 5">Paris 5 - Panthéon</option>
            <option value="paris 6">Paris 6 - Luxembourg</option>
            <option value="paris 7">Paris 7 - Palais-Bourbon</option>
            <option value="paris 8">Paris 8 - Élysée</option>
            <option value="paris 9">Paris 9 - Opéra</option>
            <option value="paris 10">Paris 10 - Entrepôt</option>
            <option value="paris 11">Paris 11 - Popincourt</option>
            <option value="paris 12">Paris 12 - Reuilly</option>
            <option value="paris 13">Paris 13 - Gobelins</option>
            <option value="paris 14">Paris 14 - Observatoire</option>
            <option value="paris 15">Paris 15 - Vaugirard</option>
            <option value="paris 16">Paris 16 - Passy</option>
            <option value="paris 17">Paris 17 - Batignolles-Monceaux</option>
            <option value="paris 18">Paris 18 - Buttes-Montmartre</option>
            <option value="paris 19">Paris 19 - Buttes-Chaumont</option>
            <option value="paris 20">Paris 20 - Ménilmontant</option>
            <option value="Fuera de Paris">Fuera de París</option>
          </select>
        </label>
      </div>

      <div>
        <label className="block font-medium mb-1">Categoría*</label>
        <select
          name="category"
          value={formData.category}
          onChange={onChange}
          className="w-full bg-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="Servicios">Servicios</option>
          <option value="Productos">Productos</option>
          <option value="Eventos">Eventos</option>
          <option value="Informacion">Información</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Precio</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={onChange}
          className="w-full bg-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="0"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          className="w-full bg-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Teléfono</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          className="w-full bg-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between items-center flex-wrap mt-8">
        <div className="flex gap-4">
          <button
            type="submit"
            className="border border-gray-800 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-800 hover:text-white"
          >
            {isEditing ? "Guardar cambios" : "Publicar post"}
          </button>

          <button
            type="button"
            onClick={() => {
              if (isEditing) {
                navigate(`/posts/${formData.id}`);
              } else {
                navigate("/");
              }
            }}
            className="border border-red-600 text-red-600 px-4 py-2 rounded-full hover:bg-red-600 hover:text-white"
          >
            Cancelar
          </button>
        </div>

        {isEditing && onDelete && (
          <div>
            <button
              type="button"
              onClick={onDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
            >
              Eliminar post
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default PostForm;
