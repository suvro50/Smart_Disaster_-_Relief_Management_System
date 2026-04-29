import { Op } from "sequelize";
import { Disaster, Resource, ResourceAllocation } from "../models/index.js";
import { emitResourceLow } from "../services/socketService.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const getResources = async (_req, res) => {
  try {
    const resources = await Resource.findAll({ order: [["id", "DESC"]] });
    return sendSuccess(res, resources, "Resources fetched successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch resources.");
  }
};

export const createResource = async (req, res) => {
  try {
    const resource = await Resource.create({ ...req.body, managed_by: req.user?.id || null });
    if (resource.quantity <= resource.minimum_stock) {
      emitResourceLow(resource);
    }
    return sendSuccess(res, resource, "Resource created successfully.", 201);
  } catch (error) {
    return sendError(res, error.message || "Failed to create resource.");
  }
};

export const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) return sendError(res, "Resource not found.", 404);
    await resource.update(req.body);
    if (resource.quantity <= resource.minimum_stock) {
      emitResourceLow(resource);
    }
    return sendSuccess(res, resource, "Resource updated successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to update resource.");
  }
};

export const getLowStockResources = async (_req, res) => {
  try {
    const resources = await Resource.findAll({
      where: {
        quantity: { [Op.lte]: Resource.sequelize.col("minimum_stock") }
      }
    });
    return sendSuccess(res, resources, "Low stock resources fetched successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch low stock resources.");
  }
};

export const getResourceAnalytics = async (_req, res) => {
  try {
    const resources = await Resource.findAll();
    const totalItems = resources.length;
    const totalQuantity = resources.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const lowStockCount = resources.filter(
      (item) => Number(item.quantity || 0) <= Number(item.minimum_stock || 0)
    ).length;

    const byCategory = resources.reduce((acc, item) => {
      const key = item.category || "other";
      acc[key] = (acc[key] || 0) + Number(item.quantity || 0);
      return acc;
    }, {});

    return sendSuccess(
      res,
      {
        totalItems,
        totalQuantity,
        lowStockCount,
        lowStockRate: totalItems ? Math.round((lowStockCount / totalItems) * 100) : 0,
        byCategory
      },
      "Resource analytics fetched successfully."
    );
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch resource analytics.");
  }
};

export const allocateResourceToDisaster = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) return sendError(res, "Resource not found.", 404);

    const disaster = await Disaster.findByPk(req.params.disasterId);
    if (!disaster) return sendError(res, "Disaster not found.", 404);

    const quantity = Number(req.body.quantity_allocated || 0);
    if (quantity <= 0) return sendError(res, "Allocation quantity must be greater than 0.", 400);
    if (quantity > Number(resource.quantity || 0)) {
      return sendError(res, "Not enough resource quantity available.", 400);
    }

    const allocation = await ResourceAllocation.create({
      resource_id: resource.id,
      disaster_id: disaster.id,
      quantity_allocated: quantity,
      allocated_by: req.user?.id || null,
      notes: req.body.notes || null
    });

    await resource.update({ quantity: Number(resource.quantity) - quantity });
    if (resource.quantity <= resource.minimum_stock) emitResourceLow(resource);

    return sendSuccess(
      res,
      { allocation, remainingQuantity: resource.quantity },
      "Resource allocated successfully."
    );
  } catch (error) {
    return sendError(res, error.message || "Failed to allocate resource.");
  }
};

export const getResourceAllocationHistory = async (_req, res) => {
  try {
    const allocations = await ResourceAllocation.findAll({
      include: [
        { association: "resource", attributes: ["id", "name", "category"] },
        { association: "disaster", attributes: ["id", "title", "severity", "district"] }
      ],
      order: [["created_at", "DESC"]]
    });
    return sendSuccess(res, allocations, "Resource allocation history fetched successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch resource allocation history.");
  }
};
